import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { DeleteOutlined, FormOutlined } from '@ant-design/icons';

import type { IArticle } from './types';

import { useAllArticlesQuery, useArticleDeleteMutation } from './queries';

import { ButtonWrapper, Title, StyledList, StyledCollapse } from './styles';

export const ArticlesSite = (): JSX.Element => {
  const { data: articles } = useAllArticlesQuery();
  const { mutate: deleteArticle } = useArticleDeleteMutation();

  const extraButtons = (article: IArticle) => (
    <ButtonWrapper>
      <Link to={`/article/${article.id}`}>
        <Button type='text' icon={<FormOutlined />} />
      </Link>
      <Button type='text' danger icon={<DeleteOutlined />} onClick={() => deleteArticle(article.id)} />
    </ButtonWrapper>
  );
  return (
    <>
      <Title>Articles</Title>
      <StyledList
        dataSource={articles ?? []}
        renderItem={(article: IArticle) => (
          <StyledCollapse
            collapsible='icon'
            items={[
              {
                label: <h3>{article.article}</h3>,
                children: <p>{article.description}</p>,
                extra: extraButtons(article),
              },
            ]}
          />
        )}
      />
    </>
  );
};
