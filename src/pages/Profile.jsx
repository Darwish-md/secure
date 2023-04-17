import { useState, useEffect } from "react";
import ProfileForm from "../forms/ProfileForm";
import {
  getCurrentProfileNFT,
  getProfileNFTs,
  switchProfile,
} from "../service/socialContractUtils";
import { MdPerson } from "react-icons/md";
import Loader from "../components/shared/Loader";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
      await loadMyNFTs();
    }
    setLoading(true);
    loadContent();
  }, []);

  const loadMyNFTs = async () => {
    const profileNFTs = await getProfileNFTs();
    setNfts(profileNFTs);
    getProfile(profileNFTs);
  };

  const getProfile = async (profileNFTs) => {
    const currentProfile = await getCurrentProfileNFT(profileNFTs);
    setProfile(currentProfile);
    console.log(currentProfile)
    setLoading(false);
  };

  const handleSwitch = async (nft) => {
    setLoading(true);
    await switchProfile(nft.id);
    console.log("set profile to");
    getProfile(nfts);
  };

  return loading ? (
    <div className='flex w-full justify-center'>
      <Loader />
    </div>
  ) : (
    <div className='mt-8'>
      <div className='flex justify-center items-stretch space-x-8 animate-fade-in'>
        {profile ? (
          <div className='rounded-lg shadow-md w-80'>
            <img
              className='w-48 h-48 object-cover object-center rounded-full mx-auto mt-4'
              src={profile.avatar}
              alt={profile.username}
            />
            <div className='p-4'>
              <h3 className='text-2xl font-semibold text-center'>
                {profile.username}
              </h3>
            </div>
          </div>
        ) : (
          <h4 className='text-xl font-semibold text-center self-center'>
            No NFT profile, please create one...
          </h4>
        )}
        <div className='w-full max-w-md'>
          <ProfileForm loadMyNFTs={loadMyNFTs} />
        </div>
      </div>
      <p>&nbsp;</p>
      <hr />
      <div className='container mx-auto px-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-8'>
          {nfts &&
            nfts.map((nft, id) => {
              if (nft.id === profile.id) return null;
              return (
                <div
                  key={id}
                  className='overflow-hidden border border-gray-900 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow py-3'
                >
                  <div className='rounded-lg shadow-md w-80 mx-auto'>
                    <img
                      className='w-48 h-48 object-cover object-center rounded-full mx-auto mt-4'
                      src={nft.avatar}
                      alt={nft.username}
                    />
                    <div className='p-4'>
                      <h3 className='text-2xl font-semibold text-center'>
                        {nft.username}
                      </h3>
                    </div>
                    <div className='px-4 py-2 rounded-b-lg'>
                      <button
                        onClick={() => handleSwitch(nft)}
                        className='w-full py-2 text-white font-semibold bg-green hover:bg-lightGreen rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center'
                      >
                        <MdPerson className='mr-2' /> Set as Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          {!nfts && (
            <h4 className='text-xl font-semibold text-center self-center'>
              No NFT profile, please create one...
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
