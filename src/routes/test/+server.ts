import { error } from '@sveltejs/kit'
import type { RequestHandler } from './$types'

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image'

// Normal .svelte component
import HelloWorld from './HelloWorld.svelte'
 
export const GET: RequestHandler = (async ({url}) => {
    try {
        const options: RenderOptions = {
            width: 1200,
            height: 600,
            props: {
                text: url.searchParams.get('text') ?? 'text not found'
            },
            fonts: [
                {
                    name: 'NeuzeitGro-Bol',
                    url: `${url.origin}/tester.ttf`,
                    weight: 400,
                    style: 'normal'
                }
            ]
        }

        // pass the component and options to the package
        const image    = await image_from_component(HelloWorld, options)
        const response = new Response(image)
        response.headers.append('Content-Type', 'image/png')
        response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800')
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error trying to generate image from component.')
    }
}) satisfies RequestHandler

export const POST: RequestHandler = (async ({url, request}) => {
    const body: any = await request.json()
    console.log(url)
    try {
        const options: RenderOptions = {
            width: 1200,
            height: 600,
            props: {
                text: body.message ?? 'text not found'
            },
            fonts: [
                {
                    name: 'NeuzeitGro-Bol',
                    url: `${url.origin}/tester.ttf`,
                    weight: 400,
                    style: 'normal'
                }
            ]
        }

        // pass the component and options to the package
        const image    = await image_from_component(HelloWorld, options)
        const response = new Response(image)
        response.headers.append('Content-Type', 'image/png')
        response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800')
        return response
    } catch (e) {
        console.error(e)
        throw error(500, 'Error trying to generate image from component.')
    }
}) satisfies RequestHandler