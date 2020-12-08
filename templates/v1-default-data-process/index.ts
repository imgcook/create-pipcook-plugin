import { DataProcessType, Metadata, ArgsType, Sample } from '@pipcook/pipcook-core';

const MyDataProcess: DataProcessType = async (data: Sample, metadata: Metadata, args: ArgsType): Promise<Sample> => {
  // write your code
  return { data: null, label: null } as Sample;
};

export default MyDataProcess;
