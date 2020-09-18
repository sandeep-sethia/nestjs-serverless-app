import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {

    public async getInfo() {
        const result = {
            'api_name': 'nestjs-serverless',
            'version': '1.0'
        }

        return result;
    }
}
