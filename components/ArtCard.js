import Link from 'next/link'
import Image from 'next/image'

export default function RecipeCard({recipe}) {
    
    const {name, slug, thumbnail} = recipe.fields
    
    return (
        <div className="card" >
            <div className="featured">
                {/* image thumb */}
                <Image
                    src={'https:'+thumbnail.fields.file.url}
                    width={thumbnail.fields.file.details.image.width}
                    height={thumbnail.fields.file.details.image.height}
                />
            </div>
            <div className="content">
                <div className="info">
                    <h4>{name}</h4>
                </div>
                <div className="actions">
                    <Link href={'/artwork/'+slug}><a>open</a></Link>
                </div>
            </div>
            <style jsx>{`
            
        .card {
          }
          .content {
            background: #fff;
            margin: 0;
            position: relative;
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
            top: -40px;
            left: -10px;
          }
          .featured {
            
            box-shadow: 1px 3px 5px rgba(0,0,0,0.1);
          }
          .info {
            padding: 16px;
          }
          .info h4 {
            margin: 4px 0;
            text-transform: uppercase;
          }
          .info p {
            margin: 0;
            color: #777;
          }
          .actions {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
          }
          .actions a {
            color: #fff;
            background: #f01b29;
            padding: 16px 24px;
            text-decoration: none;
          }
            `}</style>
        </div>

    )
}