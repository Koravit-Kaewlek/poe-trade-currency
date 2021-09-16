import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
// import data from '../mock/data.json';

export default function Home() {
  const columns = [
    {
      label: 'item',
      field: 'item.icon',
      render: (data, row) => {
        return (
          <div class="flex items-center">
            <div class="flex-shrink-0 h-10 w-10">
              <img class="h-10 w-10 rounded-full" src={data} alt="" />
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">
                {row.item.baseType}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      label: 'Name',
      field: 'listing.account.name',
    },
    {
      label: 'Character Name',
      field: 'listing.account.lastCharacterName',
    },
    // {
    //   label: 'amount',
    //   field: 'listing.price.item.amount',
    // },
    // {
    //   label: 'price',
    //   field: 'listing.price.exchange.amount',
    //   render: (data, row) => {
    //     return (
    //       <div className="text-sm text-gray-900">
    //         {data}
    //         <label className="text-yellow-400 ml-2">
    //           {row.listing.price.exchange.currency}
    //         </label>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   label: 'stock',
    //   field: 'listing.price.item.stock',
    // },
    {
      label: 'total',
      render: (_, row) => {
        const text_stock = row.listing.price.item.stock;
        const text_amount = row.listing.price.item.amount;
        const text_price = row.listing.price.exchange.amount;
        const text_total = Math.ceil(
          (parseFloat(text_price) / parseFloat(text_amount)) *
            parseFloat(text_stock)
        );
        return (
          <div className="text-sm text-green-400">
            {text_total}
            <label className="text-yellow-400 ml-2">
              {row.listing.price.exchange.currency}
            </label>
          </div>
        );
      },
    },
    {
      label: 'whisper',
      field: 'listing.whisper',
      className: 'overflow-ellipsis whitespace-nowrap max-w-2 cursor-pointer ',
      render: (data, row) => {
        const text_stock = row.listing.price.item.stock;
        const text_amount = row.listing.price.item.amount;
        const text_price = row.listing.price.exchange.amount;
        const text_total = Math.ceil(
          (parseFloat(text_price) / parseFloat(text_amount)) *
            parseFloat(text_stock)
        );
        const message = data
          .replace('{0}', text_stock)
          .replace('{1}', text_total);
        return (
          <div
            onClick={() => navigator.clipboard.writeText(message)}
            className="text-sm text-gray-900"
          >
            {message}
          </div>
        );
      },
    },
  ];

  const [data, setData] = useState([]);
  const fetch = () => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_POE_API}/api/trade/exchange/Expedition`,
        {
          exchange: {
            status: { option: 'online' },
            have: ['chaos'],
            want: ['stacked-deck'],
            minimum: 10,
          },
        },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .then((res) => {
        console.log('LOG: res ---> ', res);
      })
      .catch((err) => console.log('LOG: err ---> ', err));
  };
  useEffect(() => {
    fetch();
    return () => {};
  }, []);
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
      <Table columns={columns} data={data.result} />
    </div>
  );
}
