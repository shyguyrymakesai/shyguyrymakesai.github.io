import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import ProjectGallery from '../../components/ProjectGallery';
import TechPill from '../../components/TechPill';
import { Prism as SyntaxHighlighter, themes } from 'prism-react-renderer';
const theme = themes.github;

const components = {
  code: ({ className, children }: any) => {
    const language = className?.replace('language-', '') || '';
    return (
      <SyntaxHighlighter language={language} style={theme}>
        {String(children).trim()}
      </SyntaxHighlighter>
    );
  },
};

const modules = import.meta.glob('../../data/projects/*.mdx');

export default function ProjectPage() {
  const { slug } = useParams();
  const [Content, setContent] = useState<React.ComponentType | null>(null);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    const key = Object.keys(modules).find((k) => k.includes(`${slug}.mdx`));
    if (key) {
      modules[key]().then((mod: any) => {
        setContent(() => mod.default);
        setMeta(mod.meta);
      });
    }
  }, [slug]);

  if (!Content) return <p className="text-center py-10">Loading...</p>;

  return (
    <main className="min-h-screen font-sans p-6">
      <Link to="/" className="text-blue-600 underline">
        ← Home
      </Link>
      <h1 className="text-3xl font-bold mt-4 mb-2">{meta.title}</h1>
      <p className="text-gray-700 mb-4">{meta.summary}</p>
      <div className="mb-4">
        {meta.techStack?.map((t: string) => (
          <TechPill key={t} name={t} />
        ))}
      </div>
      {meta.media && <ProjectGallery items={meta.media} />}
      {meta.demo && (
        <div className="my-6">
          <iframe src={meta.demo} className="w-full h-96" />
        </div>
      )}
      {meta.repo && (
        <p className="mt-4">
          <a href={meta.repo} target="_blank" rel="noopener" className="text-blue-600 underline">
            View on GitHub
          </a>
        </p>
      )}
      <article className="prose max-w-none mt-8">
        <MDXProvider components={components}>{<Content />}</MDXProvider>
      </article>
    </main>
  );
}
