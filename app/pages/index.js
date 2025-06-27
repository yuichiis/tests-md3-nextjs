// pages/index.js
import { getStaticProps } from 'next';
import fs from 'fs';
import matter from 'gray-matter';
import Layout from '../components/Layout';
import { remark } from 'remark';
import html from 'remark-html';

export const getStaticProps = async () => {
  const markdownWithMetadata = fs.readFileSync('posts/introduction.md', 'utf-8');
  const { content, data } = matter(markdownWithMetadata);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    props: {
      contentHtml,
    },
  };
};

const HomePage = ({ contentHtml }) => {
  return (
    <Layout>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Layout>
  );
};

export default HomePage;
