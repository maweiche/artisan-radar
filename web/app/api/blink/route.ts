import {ActionGetResponse, ACTIONS_CORS_HEADERS, } from "@solana/actions"

export async function GET( request: Request ) {
    try {
        const DONATION_AMOUNT_SOL_OPTIONS = [1, 2, 3, 4];
        const ITEMS = [
            "Magentaflare Diamond",
            "Nardin - Freak",
            "Richard Mille",
            "Patek - Nautilus"
        ];
        console.log('route pinged')
        function getDonateInfo(): Pick<
            ActionGetResponse,
            'icon' | 'title' | 'description'
        > {
            const icon ='https://artisan-solana.s3.eu-central-1.amazonaws.com/ArtisanBlink.png';
            const title = 'Real World Asset Investing - Artsn.Fi';
            const description =
            'Choose from a selection of real world assets to invest in for $1 USDC-Dev.';
            return { icon, title, description };
        }
        
        const { icon, title, description } = getDonateInfo();
        const response: ActionGetResponse = {
            icon,
            label: `Invest in Real World Assets with Artsn.Fi`,
            title,
            description,
            links: {
            actions: [
                ...DONATION_AMOUNT_SOL_OPTIONS.map((amount, index) => ({
                label: `${index +1}) ${ITEMS[amount - 1]}`,
                href: `/api/blink/${amount}`,
                })),
                // {
                // href: `/api/blink/{${amountParameterName}}`,
                // label: 'Buy',
                // parameters: [
                //     {
                //     name: amountParameterName,
                //     label: 'Enter a share amount',
                //     },
                // ],
                // },
            ],
            },
        };

        const res = Response.json(response, {headers: ACTIONS_CORS_HEADERS})
        console.log('res', res);
        return res
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function OPTIONS( request: Request ) {
    return Response.json(null, {headers: ACTIONS_CORS_HEADERS})
};