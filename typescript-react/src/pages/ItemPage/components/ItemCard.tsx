//item 객체의 타입 정의
interface Item {
    images: string;
    name: string;
    price: string;
    description: string;
    favoriteCount: number; 
    tags: string[]
}

interface ItemCardProps {
    item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({item})=> {
    return(
        <div className="itemCard">
            <div className="itemImage">
                <img src={item.images} alt={item.name} />
            </div>
            <h2 className="itemName">{item.name} 팔아요</h2>
            <h1 className="price">{item.price}</h1>
            <div className="label">상품소개</div>
            <p className="description">{item.description}</p>
            <div className="label">상품태그</div>
            <ul>
                {item.tags.map((tag, index) => (
                    <li key={index}>{tag}</li>
                ))}
            </ul>
            <p>{item.favoriteCount}</p>
        </div>
    );
}

export default ItemCard;