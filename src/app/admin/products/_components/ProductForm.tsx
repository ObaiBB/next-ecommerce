"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { Product } from "@prisma/client"
import Image from "next/image"


export function ProductForm({product} : {product?: Product | null}){

    const [error, action] = useActionState(product == null ? addProduct : updateProduct.bind(null, product.id), {})

    const [priceInCents, setPriceInCents] = useState<number | undefined>(product?.priceInCents)

    return (
    <form action={action} className="space-y-8">

    <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" defaultValue={product?.name || ""} required />
        {error.name && <div className="text-destructive">{error.name}</div>}
    </div>

    <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input type="text" id="priceInCents" name="priceInCents" required value={priceInCents} onChange={e => setPriceInCents(Number(e.target.value) || undefined)} />

        <div className="text-muted-foreground">
            {formatCurrency((priceInCents || 0) / 100)}
            {error.priceInCents && <div className="text-destructive">{error.priceInCents}</div>}
        </div>
    </div>

    <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" defaultValue={product?.description} required />
        {error.description && <div className="text-destructive">{error.description}</div>}
    </div>

    <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input type="file" id="file" name="file" required={product==null} />
        {error.file && <div className="text-destructive">{error.file}</div>}
        {product!=null && (<div className="text-muted-foreground">{product.filePath}</div>)}
        
    </div>
    <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" required={product==null} />
        {product != null && <Image src={`/${product.imagePath}`} height={"400"} width={"400"} alt="Product Image" />}
    </div>

    <SubmitButton />


    </form>)
}


function SubmitButton(){
    const {pending} = useFormStatus()
    return <Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save"}</Button>
}