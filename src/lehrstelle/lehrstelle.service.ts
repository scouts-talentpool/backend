import { Injectable } from '@nestjs/common';
import { Lehrstelle } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LehrstelleService {
    constructor(readonly prismaService: PrismaService) { }

    async create(lehrstelle: Lehrstelle) {
        const { startjahr, stellenanzahl, ausbildungskonzept, bewerbungsvorgehen, ausbildungsorte } = lehrstelle;

        return await this.prismaService.lehrstelle.create({
            data: {
                startjahr: +startjahr,
                stellenanzahl: +stellenanzahl,
                ausbildungsorte,
                ausbildungskonzept,
                bewerbungsvorgehen,
                firma: {
                    connect: {
                        id: +lehrstelle.firmaId
                    }
                },
                lehrberuf: {
                    connect: {
                        id: +lehrstelle.lehrberufId
                    }
                },
            },
            include: {
                lehrberuf: true,
                firma: true
            }
        })
    }

    async findAll() {
        return await this.prismaService.lehrstelle.findMany({
            include: {
                lehrberuf: true,
                firma: true
            }
        });
    }

    async findOne(id: number) {
        return await this.prismaService.lehrstelle.findUnique({
            where: {
                id
            },
            include: {
                lehrberuf: true,
                firma: true
            }
        });
    }

    // update(id: number, updateLehrstelleDto: UpdateLehrstelleDto) {
    //   return `This action updates a #${id} lehrstelle`;
    // }
    //
    // remove(id: number) {
    //   return `This action removes a #${id} lehrstelle`;
    // }
}
