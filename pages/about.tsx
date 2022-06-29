import type { NextPage } from "next";
import {
  SerializableBlock,
} from "../app/ui/components/modules/wyswyg-editor";
import AboutTemplate from "../app/config/editor-templates/about.editor.template.en.json";
import ArticlePage from "../app/ui/components/layouts/pages/article.page";
const About: NextPage = () => {
  return (
    <>
      <ArticlePage
        name="About"
        heading="About Donorhub"
        blocks={AboutTemplate.blocks as SerializableBlock[]}
      />
    </>
  );
};

export default About;
