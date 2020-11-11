export type MoneyAccount = {
    institutionId: string,
    bank: string,
    addedOn: string,
    url: string,
    logo: string,
    publicToken: string
};

export class SpradlingRestApi {
    constructor() {}

    private async fetch<T = any>(input: string, init?: RequestInit): Promise<T> {
        const resp = await fetch(`${input}`, init);
        console.log({RESP: resp})
        if (!resp.ok) throw Error;
        return await resp.json();
    }

    async createMoneyAccount(): Promise<{}> { 
        console.log(`Creating money account`)

        return this.fetch(`https://randomuser.me/api/?results=20`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            });
    }

    async getMoneyAccounts(): Promise<MoneyAccount[]> {
        console.log(`Fetching money accounts`)

        return Promise.resolve([
            {
                'bank': "Wells Fargo",
                'institutionId': 'ins_3',
                'addedOn': "2020-11-11T01:29:48+0000",
                'url': "https://www.wellsfargo.com",
                'publicToken': '123',
                'logo': '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'
            }
        ]);
    }
}