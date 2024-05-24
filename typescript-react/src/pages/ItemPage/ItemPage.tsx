import ItemDetailSection from "./components/ItemDetailSection";
import CommentsSection from "./components/CommentsSection";
import "./ItemPage.css";

import "./ItemPage.css";

function ItemPage() {
    return (
        <div className="wrapper">
            <ItemDetailSection />
            <CommentsSection />
        </div>
    );
}

export default ItemPage;