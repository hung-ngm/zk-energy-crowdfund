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
  minGoal: 0,
  maxGoal: 0,
  minContribution: 0,
  maxContribution: 0,
  twitterHandle: '',
  message: '',
  description: '',
  holdOff: 0,
  duration: 0,
  token: '',
  recipient: ''
};

type Fields = {
  name: string;
  minGoal: number,
  maxGoal: number,
  minContribution: number,
  maxContribution: number,
  twitterHandle: string;
  description: string;
  message: string;
  holdOff: number;
  duration: number;
  token: string;
  recipient: string
};

type FormCreateCampaignProps = {
  refetchMemos: ReturnType<typeof useOnchainCoffeeMemos>['refetchMemos'];
};

function FormCreateCampaign({ refetchMemos }: FormCreateCampaignProps) {
  const contract = useBuyMeACoffeeContract();

  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  const reset = useCallback(async () => {
    resetFields();
    await refetchMemos();
  }, [refetchMemos, resetFields]);

  const { disabled, transactionState, resetContractForms, onSubmitTransaction } =
    useSmartContractForms({
      gasFee: parseEther(String(GAS_COST)),
      contract,
      name: 'deployCampaign',
      arguments: [fields.recipient, fields.minGoal, fields.maxGoal, fields.minContribution, fields.maxContribution, fields.holdOff, fields.duration, "0x7C65d5C1497472B5Dd0434D681FBe619935D1fF4", 85, 4,"0x56C1a83A4682837528b04292AF27ef648aC6dDab"],
      enableSubmit: fields.name !== '' && fields.message !== '',
      reset,
    });

  if (transactionState !== null) {
    return (
      <TransactionSteps
        transactionStep={transactionState}
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
            <Label htmlFor="name">Minimum Goal</Label>
            <InputText
              id="goal"
              placeholder="Minimum Goal"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('minGoal', Number(evt.target.value))}
              disabled={!disabled}
              required
            />
          </div>

          <div className="mb-5">
            <Label htmlFor="name">Maximum Goal</Label>
            <InputText
              id="goal"
              placeholder="Maximum Goal"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('maxGoal', Number(evt.target.value))}
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
              placeholder="Message"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('message', evt.target.value)}
              disabled={!disabled}
              required
            />

          <div className="mb-5">
            <Label htmlFor="message">Time till start (seconds)</Label>
              <InputText
                id="holdOff"
                placeholder="holdOff"
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onChange={(evt) => setField('holdOff', Number(evt.target.value))}
                disabled={!disabled}
                required
              />
          </div>

          <div className="mb-5">
              <Label htmlFor="duration">Duration</Label>
              <select
                id="duration"
                onChange={(evt) => setField('duration', Number(evt.target.value))}
                disabled={!disabled}
                required
              >
                <option value={0}>Select duration</option>
                <option value={1}>1 hour</option>
                <option value={24}>1 day</option>
                <option value={168}>1 week</option>
                <option value={720}>1 month</option>
              </select>
            </div>
          </div>

          <div className="mb-5">
            <Label htmlFor="token">Token</Label>
            <select
              id="token"
              onChange={(evt) => setField('token', evt.target.value)}
              disabled={!disabled}
              required
            >
              <option value="">Select token</option>
              <option value="USDC">USDC</option>
              <option value="USDT">USDT</option>
            </select>
          </div>

          <div className="mb-5">
            <Label htmlFor="recipient">Recipient</Label>
            <InputText
              id="recipient"
              placeholder="Contract address"
              onChange={(evt) => setField('recipient', evt.target.value)}
              disabled={!disabled}
              required
            />
          </div>

          <ContractAlert contract={contract} amount={GAS_COST} />

          <Button
            buttonContent={
              <>
                Create campaign
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

export default FormCreateCampaign;
