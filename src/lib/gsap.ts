import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/CustomEase';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, CustomEase, SplitText, useGSAP);
  // Mirrors --ease-out (cubic-bezier(0.16, 1, 0.3, 1)) from globals.css.
  CustomEase.create('imobEaseOut', '0.16, 1, 0.3, 1');
}

export { gsap, ScrollTrigger, CustomEase, SplitText, useGSAP };
