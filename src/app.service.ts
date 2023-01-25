import { Injectable } from '@nestjs/common';
import { DbService } from './shared';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';
@Injectable()
export class AppService {
  constructor(private readonly db: DbService) {}
  async getAggregateBalance(): Promise<string>{
      const apikey='ckey_8580a29b4aac4fb8990dd551693';
      const url=`https://api.covalenthq.com/v1/1/address/0x52114fb7396dbe19096ffa343d18830f5d77b6c6/balances_v2/?key=${apikey}`;
      const response=await fetch(url);
      var data=await response.json();
      const output=`{
                      adress:${data.data.address},
                      balances:{
                          eth:[
                          {
                            name:${data.data.items[0].contract_name},
                            symbol:${data.data.symbol},
                            decimals:${data.data.items[0].contract_decimals},
                            contractAdress:${data.data.items[0].contract_decimals},
                            logo:${data.data.items[0].logo_url},
                            balance:${data.data.items[0].balance}
                          }
                        ]
                      }
                  }`
      console.log(output)
      return output
    }
    async WatchListManagementFeature(): Promise<string>{
      const url=`https://api.coingecko.com/api/v3/coins/list`
      const response=await fetch(url);
      var data=await response.json();
      const output=`{
        coins:
        [
          {
            "id":${data[0].id},
            "symbol":${data[0].symbol}
            "name":${data[0].name}
          }
        ]
      }`
      console.log(output)
      return output
    }
  async getHello(): Promise<string> {
    const r1=this.getAggregateBalance();
    const r2=this.WatchListManagementFeature();
    const result = await this.db.create('vitalikWatchlist', ['matic-network']);
    return `Hello Wold! ${JSON.stringify(result)} ${r1} ${r2}`;  
  }
}
