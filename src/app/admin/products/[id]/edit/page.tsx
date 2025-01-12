import { db } from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
    params} : {
        params: Promise<{ id: string }>
    }

){

    const {id} = await params

    const product = await db.product.findUnique(
        {where: {id}}
    )

    return <>
        <PageHeader>
            Edit product
        </PageHeader>
        <ProductForm product={product} />
    </>
}