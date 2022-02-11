import { createClient } from "contentful"
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Skeleton from "../../components/Skeleton";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_KEY,
});

export const getStaticPaths = async() => {
  const res = await client.getEntries({content_type:'artwork'})

  const paths = res.items.map(item=>{
    return {
      params: {
        slug: item.fields.slug
      }
    }
  })

  return {
    paths,
    fallback: true
  }
}


export async function getStaticProps({params}) {
  const { items } = await client.getEntries({
    content_type: 'artwork',
    'fields.slug': params.slug
  })

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      recipe: items[0]
    },
    revalidate: 1
  }
}


export default function RecipeDetails({recipe}) {
  if (!recipe) return <Skeleton/>
  
  const { thumbnail, title, tags, description } = recipe.fields
  
  return (
    <div>
      <div className="banner">
        <Image
          src={'https:'+thumbnail.fields.file.url}
          height={thumbnail.fields.file.details.image.height}
          width={thumbnail.fields.file.details.image.width}
        />
        <h2>{title}</h2>
      </div>
      <div className="info">
        <h3>tags:</h3>
        {tags.map(ing=>(
          <span key={ing}>{ing}</span>
        ))}
      </div>
      <div className="description">
        <h3>description:</h3>
        <div>{documentToReactComponents(description)}</div>
      </div>
      <style jsx>{`
        h2, h3 {
          text-transform: uppercase;
        }
        .banner h2 {
          margin: 0;
          background: #fff;
          display: inline-block;
          padding:20px;
          position: relative;
          top:-60px;
          left:-10px;
          transform: rotateZ(-1deg);
          box-shadow: 1px 3px 5px rgba(0,0,0,0.1)
        }
        .info p{
          margin: 0;
        }
        .info span::after {
          content: ", ";
        }
      `}</style>
    </div>
  )
}