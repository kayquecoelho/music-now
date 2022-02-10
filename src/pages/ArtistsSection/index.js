import { useEffect, useState } from "react";
import requests from "../../services/requests";

import { Banner, Container, Content } from "../../components/ProductCard";
import { Artists, HorLine, StyledLink, Title } from "./style";
import Logo from "../../assets/img/logo.png";


export default function ArtistsSection() {
  const [artists, setArtists] = useState(null);

  useEffect(() => {
    requestArtists();
  }, []);

  async function requestArtists(){
    try {
      const response = await requests.getArtists();
      
      setArtists(response.data);
    } catch (error) {
      alert(error.response.data)
    }
  }
  return (
    <Container>
      <Content>
        <Banner>
            <img alt="logo.png" src={Logo} />
        </Banner>

        <Title>
          <span>Artistas</span>
          <HorLine></HorLine>
        </Title>
        <Artists>
          {artists?.map((artist) => <StyledLink key={artist._id} to={`/artist/${artist._id}`}>{artist.name}</StyledLink>)}
        </Artists>

      </Content>
    </Container>
  )
}
