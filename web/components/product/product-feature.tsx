export default function ProductFeature({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Product Feature</h1>
            <p>This is the product details page for product {params.id}</p>
        </div>
    )
}