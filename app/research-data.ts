import facultyData from './data/faculty.json';
import topicData from './data/topics.json';
export type Faculty={name:string;designation:string;qualification:string;specialization:string;department_role?:string};
export type Topic=typeof topicData[number];
export const faculty=facultyData.faculty as Faculty[];
export const topics=topicData;
export const academicYear=facultyData.academic_year;
export const asset=(path:string)=>(process.env.NEXT_PUBLIC_BASE_PATH||'')+path;
const words=(s:string)=>s.toLowerCase().replace(/[^a-z0-9 ]/g,' ').split(/\s+/).filter(w=>w.length>2);
export function relatedTopics(f:Faculty){
 const s=f.specialization.toLowerCase();
 const target=s.includes('security')?['Cybersecurity']:s.includes('cloud')?['Cloud Computing']:s.includes('vision')||s.includes('image')||s.includes('deep learning')?['Manufacturing','Agriculture']:s.includes('machine learning')||s.includes('data mining')||s.includes('ai')?['Manufacturing','Energy','Transportation']:s.includes('network')||s.includes('multi core')||s.includes('computational')?['Cloud Computing','Cybersecurity']:['Natural Language Processing','Transportation','Energy'];
 return topics.filter(t=>target.includes(t.domain)).map(t=>({topic:t,reason:s==='cse'||s==='it'||s==='information technology'?'Related through general computing and data-analysis foundations.':`Connected to the listed specialization: ${f.specialization}.`}));
}
export function matchingFaculty(t:Topic){return faculty.filter(f=>relatedTopics(f).some(r=>r.topic.id===t.id)).sort((a,b)=>Number(Boolean(b.department_role))-Number(Boolean(a.department_role))).slice(0,6)}
export function searchTopics(query:string,domain:string,level:string){
 const keys=words(query);
 return topics.filter(t=>(!domain||t.domain===domain)&&(!level||t.difficulty===level)).map(t=>({topic:t,score:keys.reduce((score,key)=>score+Number(words([t.title,t.domain,t.description,...t.skills].join(' ')).some(w=>w.includes(key)||key.includes(w))),0)})).filter(r=>!keys.length||r.score>0).sort((a,b)=>b.score-a.score).map(r=>r.topic);
}
