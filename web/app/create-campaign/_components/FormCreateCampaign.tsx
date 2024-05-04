import { useCallback } from 'react';
import { parseEther } from 'viem';
import Button from '@/components/Button/Button';
import { useBuyMeACoffeeContract } from '../_contracts/useBuyMeACoffeeContract';
import useFields from '../_hooks/useFields';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import ContractAlert from './ContractAlert';
import InputText from './InputText';
import Label from './Label';
import TextArea from './TextArea';
import TransactionSteps from './TransactionSteps';
import useSmartContractForms from './useSmartContractForms';

const GAS_COST = 0.0001;


const initFields = {
  name: '',
  goal: '',
  twitterHandle: '',
  coffeeCount: 1,
  message: '',
  description: '',
};

type Fields = {
  name: string;
  goal: string;
  twitterHandle: string;
  coffeeCount: number;
  description: string;
  message: string;
};

type FormBuyCoffeeProps = {
  refetchMemos: ReturnType<typeof useOnchainCoffeeMemos>['refetchMemos'];
};

function FormCreateCampaign({ refetchMemos }: FormBuyCoffeeProps) {
  const contract = useBuyMeACoffeeContract();

  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  const reset = useCallback(async () => {
    resetFields();
    await refetchMemos();
  }, [refetchMemos, resetFields]);

  const { disabled, transactionState, resetContractForms, onSubmitTransaction } =
    useSmartContractForms({
      gasFee: parseEther(String(GAS_COST * fields.coffeeCount)),
      contract,
      name: 'buyCoffee',
      arguments: [fields.coffeeCount, fields.name, fields.twitterHandle, fields.message],
      enableSubmit: fields.name !== '' && fields.message !== '',
      reset,
    });

  if (transactionState !== null) {
    return (
      <TransactionSteps
        transactionStep={transactionState}
        coffeeCount={fields.coffeeCount}
        resetContractForms={resetContractForms}
        gasCost={GAS_COST}
      />
    );
  }

  return (
    <>
      <h2 className="mb-5 w-full text-center text-2xl font-semibold text-white lg:text-left">
        Create Campaign
      </h2>
      <form onSubmit={onSubmitTransaction} className="w-full">
        <div>
          <div className="mb-5">
            <Label htmlFor="name">Name</Label>
            <InputText
              id="name"
              placeholder="Name"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('name', evt.target.value)}
              disabled={!disabled}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="name">Goal</Label>
            <InputText
              id="goal"
              placeholder="Goal"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('goal', evt.target.value)}
              disabled={!disabled}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="name">Description</Label>
            <InputText
              id="description"
              placeholder="Description"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('description', evt.target.value)}
              disabled={!disabled}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="twitterHandle">Twitter handle (Optional)</Label>
            <InputText
              id="twitterHandle"
              placeholder="@"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => {
                setField('twitterHandle', evt.target.value);
              }}
              disabled={!disabled}
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="message">Message</Label>
            <TextArea
              id="message"
              placeholder="Say something"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('message', evt.target.value)}
              disabled={!disabled}
              required
            />
          </div>

          <ContractAlert contract={contract} amount={GAS_COST} />

          <Button
            buttonContent={
              <>
                Send {fields.coffeeCount} coffee{fields.coffeeCount > 1 ? 's' : null} for{' '}
                {String((GAS_COST * fields.coffeeCount).toFixed(4))} ETH
              </>
            }
            type="submit"
            disabled={!disabled}
          />
        </div>
      </form>
    </>
  );
}

export default FormBuyCoffee;
