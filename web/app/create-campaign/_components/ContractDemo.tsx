import { clsx } from 'clsx';
import FormCreateCampaign from './FormCreateCampaign';

export default function BuyMeCoffeeContractDemo() {

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        className={clsx([
          'w-full max-w-2xl',
          'rounded-lg border border-solid border-boat-color-palette-line',
          'bg-boat-color-palette-backgroundalternate p-10', // Adjust the left margin
        ])}
      >
        <FormCreateCampaign />
      </div>
    </div>
  );
}
