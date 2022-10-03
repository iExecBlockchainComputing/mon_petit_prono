import './footer.css'

import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { IoLogoTwitter, IoLogoYoutube } from 'react-icons/io'
import { SiDiscord, SiTelegram, SiMedium } from 'react-icons/si'
import { FaRedditAlien } from 'react-icons/fa'
import { RiFacebookFill } from 'react-icons/ri'

export default function Footer() {
  return (
    <Container id="footer">
      <Row id="separation">
        <hr />
      </Row>
      <Row max-width="15px">
        <span>
          <a href="https://twitter.com/iEx_ec">
            <IoLogoTwitter color="white" size={15} />
          </a>
          <a href="https://discord.gg/pbt9m98wnU">
            <SiDiscord color="white" size={15} />
          </a>
          <a href="https://t.me/iexec_rlc_official">
            <SiTelegram color="white" size={15} />
          </a>
          <a href="https://www.youtube.com/channel/UCwWxZWvKVHn3CXnmDooLWtA">
            <IoLogoYoutube color="white" size={15} />
          </a>
          <a href="https://www.reddit.com/r/iexec/">
            <FaRedditAlien color="white" size={15} />
          </a>
          <a href="https://www.facebook.com/Iex-ec-1164124083643301/">
            <RiFacebookFill color="white" size={15} />
          </a>
          <a href="https://medium.com/iex-ec">
            <SiMedium color="white" size={15} />
          </a>
        </span>
      </Row>
      <Row>
        <a href="test" id="FAQ">
          FAQ
        </a>
      </Row>
    </Container>
  )
}
