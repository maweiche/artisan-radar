import { Db } from 'mongodb';

export interface Context {
    db: Db;
}
  
export interface IPAsset {
    uuid: string;
    name: string;
    description: string;
    videoLink: string;
    fileLink: string;
    blockchainId: string;
    proofHash: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    type: string;
    commercialTerms: string;
    collaborators: string[];
}

export interface IPAssetInput {
    name: string;
    description: string;
    videoLink: string;
    fileLink: string;
    blockchainId: string;
    proofHash: string;
    status: string;
    type: string;
    commercialTerms: string;
    collaborators: string[];
  }