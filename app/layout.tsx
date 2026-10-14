import type { Metadata } from 'next';
import './globals.css';
import './academic.css';
import './showcase.css';
export const metadata: Metadata = {title:'Research Nexus | Panimalar Engineering College · AIML',description:'An academic project for problem discovery and student–faculty research collaboration in Artificial Intelligence and Machine Learning.'};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
