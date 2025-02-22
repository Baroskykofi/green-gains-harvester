
import { useContractRead, useContractWrite } from 'wagmi';
import { CONTRACT_ADDRESSES } from '@/config/constants';
import projectListingABI from '@/abis/ProjectListing.json';
import daoABI from '@/abis/DAO.json';
import donateABI from '@/abis/Donate.json';

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
  const { writeAsync: listProject } = useContractWrite({
    address: CONTRACT_ADDRESSES.projectListing,
    abi: projectListingABI,
    functionName: 'listProject',
  });

  const { writeAsync: joinDAO } = useContractWrite({
    address: CONTRACT_ADDRESSES.dao,
    abi: daoABI,
    functionName: 'joinDAO',
  });

  const { writeAsync: donateToProject } = useContractWrite({
    address: CONTRACT_ADDRESSES.donate,
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
