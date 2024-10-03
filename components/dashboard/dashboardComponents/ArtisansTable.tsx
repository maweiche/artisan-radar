'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/shadcn/table-ui';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar-ui';
import { DollarSign, Flame, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/shadcn/card-ui';

// Sample data
const artisans = [
  {
    id: 1,
    name: 'John Doe',
    subName: '@johndoe',
    value: 5000,
    price: 10000,
    marketCap: 80000,
    totalOffer: 200,
  },
  {
    id: 2,
    name: 'Jane Smith',
    subName: '@janesmith',
    value: 6000,
    price: 12000,
    marketCap: 90000,
    totalOffer: 180,
  },
  {
    id: 3,
    name: 'Bob Johnson',
    subName: '@bobjohnson',
    value: 4500,
    price: 9000,
    marketCap: 70000,
    totalOffer: 220,
  },
];

const ArtisansTable = () => {
  const [data] = useState(artisans);

  return (
    <Card className="rounded-3xl w-ful bg-bg text-secondary border-zinc-300 dark:border-zinc-700">
      <CardContent className="p-6">
        <div className="w-full bg-bg text-secondary">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-2xl font-semibold">My Artisans</h2>
            <span className="text-sm text-zinc-300">{data.length}</span>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Market Cap</TableHead>
                <TableHead>Total Offer</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((artisan) => (
                <TableRow key={artisan.id}>
                  <TableCell className="flex items-center space-x-2">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/6.x/initials/svg?seed=${artisan.name}`}
                      />
                      <AvatarFallback>{artisan.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div>{artisan.name}</div>
                      <div className="text-sm text-gray-500">
                        {artisan.subName}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>${artisan.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <span className="text-nowrap"> 1 fraction</span>
                      <Flame className="w-4" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>${artisan.price.toLocaleString()}</span>
                      <Flame size={16} />
                    </div>
                  </TableCell>
                  <TableCell>${artisan.marketCap.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{artisan.totalOffer}</span>
                      <Flame size={16} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtisansTable;