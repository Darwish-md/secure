import { useState, useEffect } from "react";
import { Row, Form, Button, Card, Col } from "react-bootstrap";
import ProfileForm from "../forms/ProfileForm";
import { getCurrentProfileNFT, getProfileNFTs, switchProfile} from "../service/socialContractUtils";
const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY;

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadContent() {
        await loadMyNFTs()
    }
    setLoading(true)
    loadContent();
  }, []);
    
  const loadMyNFTs = async () => {
    const profileNFTs = await getProfileNFTs();
    setNfts(profileNFTs);
    getProfile(profileNFTs);
  };

  const getProfile = async (profileNFTs) => {
    const currentProfile = await getCurrentProfileNFT(profileNFTs)
    setProfile(currentProfile);
    setLoading(false);
  };

  const handleSwitch = async (nft) => {
    setLoading(true);
    await switchProfile(nft.id);
    getProfile(nfts);
  };

  return (
    <div className='mt-4 text-center'>
      {profile ? (
        <div className='mb-3'>
          <h3 className='mb-3'>{profile.username}</h3>
          <img
            className='mb-3'
            style={{ width: "400px" }}
            src={profile.avatar}
          />
        </div>
      ) : (
        <h4 className='mb-4'>No NFT profile, please create one...</h4>
      )}
    <ProfileForm loadMyNFTs={loadMyNFTs}/>
      <div className='px-5 container'>
        <Row xs={1} md={2} lg={4} className='g-4 py-5'>
          {nfts.map((nft, idx) => {
            if (nft.id === profile.id) return;
            return (
              <Col key={idx} className='overflow-hidden'>
                <Card>
                  <Card.Img variant='top' src={nft.avatar} />
                  <Card.Body color='secondary'>
                    <Card.Title>{nft.username}</Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button
                        onClick={() => handleSwitch(nft)}
                        variant='primary'
                        size='lg'
                      >
                        Set as Profile
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
};

export default Profile;
