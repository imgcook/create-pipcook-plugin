import { ArgsType, DataCollectType } from '@pipcook/pipcook-core';

const MyDataCollect: DataCollectType = async (args: ArgsType): Promise<void> => {
  const { url, dataDir } = args;
  await fs.ensureDir(dataDir);
  
  // write your code
};

export default MyDataCollect;
