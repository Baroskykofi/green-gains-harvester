
import { useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/constants';
import projectListingABI from '@/abis/ProjectListing.json';
import daoABI from '@/abis/DAO.json';
import donateABI from '@/abis/Donate.json';
import { parseEther } from 'viem';

export function useContracts() {
  // ProjectListing Contract Reads
  const { data: projectCount } = useContractRead({
    address: CONTRACT_ADDRESSES.projectListing,
    abi: projectListingABI,
    functionName: 'projectCounter',
  });

  const { data: subscriptionFee } = useContractRead({
    address: CONTRACT_ADDRESSES.projectListing,
    abi: projectListingABI,
    functionName: 'subscriptionFee',
  });

  // DAO Contract Reads
  const { data: minStakeAmount } = useContractRead({
    address: CONTRACT_ADDRESSES.dao,
    abi: daoABI,
    functionName: 'minStakeAmount',
  });

  // Contract Writes
  const { write: listProject } = useContractWrite({
    abi: projectListingABI,
    functionName: 'listProject',
  });

  const { write: joinDAO } = useContractWrite({
    abi: daoABI,
    functionName: 'joinDAO',
  });

  const { write: donateToProject } = useContractWrite({
    abi: donateABI,
    functionName: 'donateToProject',
  });

  return {
    projectCount,
    subscriptionFee,
    minStakeAmount,
    listProject,
    joinDAO,
    donateToProject,
  };
}
