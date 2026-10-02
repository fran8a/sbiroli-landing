import { RefObject, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ScrollRevealConfig {
  selector: string;
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

export const useScrollReveal = (
  scope: RefObject<HTMLElement>,
  configurations: ScrollRevealConfig[],
  dependencies: ReadonlyArray<unknown> = []
): void => {
  useLayoutEffect(() => {
    const element = scope.current;

    if (!element || window.matchMedia(reducedMotionQuery).matches) {
      return;
    }

    const context = gsap.context(() => {
      configurations.forEach(({ selector, y = 28, duration = 0.7, stagger = 0.1, start = 'top 82%' }) => {
        const targets = Array.from(element.querySelectorAll<HTMLElement>(selector));

        if (targets.length === 0) {
          return;
        }

        gsap.from(targets, {
          autoAlpha: 0,
          y,
          duration,
          stagger,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: targets[0],
            start,
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, element);

    return () => context.revert();
  }, [scope, ...dependencies]);
};

export const useScrollParallax = (
  scope: RefObject<HTMLElement>,
  selector: string,
  yPercent = 5
): void => {
  useLayoutEffect(() => {
    const element = scope.current;

    if (!element || window.matchMedia(reducedMotionQuery).matches) {
      return;
    }

    const targets = Array.from(element.querySelectorAll<HTMLElement>(selector));
    const context = gsap.context(() => {
      targets.forEach((target) => {
        gsap.to(target, {
          yPercent,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      });
    }, element);

    return () => context.revert();
  }, [scope, selector, yPercent]);
};
