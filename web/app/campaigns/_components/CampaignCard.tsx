import { Avatar, Name } from '@coinbase/onchainkit/identity';
import { clsx } from 'clsx';
import { convertBigIntTimestampToDate } from '@/utils/timestamp';
import type { Campaign } from './types';

function CampaignCard({ 
  totalSupply, 
  recipientAddress, 
  name, 
  description, 
  goalMin,
  endsAt
}: Campaign) {
  // const convertedTimestamp = convertBigIntTimestampToDate(time);
  // const numCoffeesInt = Number(numCoffees);

  const totalSupplyInt = Number(totalSupply);
  const goalMinInt = Number(goalMin);

  const convertedEndsAt = convertBigIntTimestampToDate(endsAt);

  return (
    <li className="flex w-full flex-col items-start gap-4">
      <div className="w-full grow items-center justify-between lg:flex">
        <div className="flex items-center gap-3">
          <Avatar address={recipientAddress} />
          <div className="inline-flex items-start gap-1 md:flex">
            <span className="text-3 text-bold truncate text-wrap font-bold text-boat-color-palette-foreground">
              <Name address={recipientAddress} />
            </span>
            <span className="text-3 line-clamp-1 flex-1 truncate text-wrap break-all font-normal text-boat-color-palette-foregroundmuted">
              {name}
            </span>
            <span className="text-3 whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
              raised {totalSupplyInt}/{goalMinInt}
            </span>
          </div>
        </div>
        <div className="text-3 ml-[43px] whitespace-nowrap font-normal text-boat-color-palette-foregroundmuted">
          Campaign ends at {convertedEndsAt.toDateString()}
        </div>
      </div>
      <div
        className={clsx([
          'flex w-full items-center rounded-2xl border-2',
          'border-solid border-[color:var(--boat-color-foregroundMuted,#8A919E)] p-6 backdrop-blur-[20px]',
        ])}
      >
        <p className="flex w-[0px] shrink grow items-start gap-1">
          <span
            className={clsx([
              'truncate whitespace-nowrap text-wrap text-base ',
              'font-normal not-italic leading-6 text-boat-color-palette-foreground',
            ])}
          >
            {description}
          </span>
        </p>
      </div>
    </li>
  );
}

export default CampaignCard;
