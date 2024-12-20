// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { SocialDiscord24, SocialTwitter24 } from "@mysten/icons";
import { type ReactNode } from 'react';

type FooterItem = {
	category: string;
	items: { title: string; children: ReactNode; href: string }[];
};
export type FooterItems = FooterItem[];

function FooterIcon({ children }: { children: ReactNode }) {
	return <div className="flex items-center text-steel-darker">{children}</div>;
}

export const footerLogoLink = {
  title: "Suiware.io",
  href: "https://suiware.io",
};

export const footerLinks = [
  // { title: 'Blog', href: 'https://mystenlabs.com/blog' },
  // {
  // 	title: 'Whitepaper',
  // 	href: 'https://github.com/MystenLabs/sui/blob/main/doc/paper/sui.pdf',
  // },
  // {
  // 	title: 'Docs',
  // 	href: 'https://docs.mystenlabs.com',
  // },
  {
    title: "GitHub",
    href: "https://github.com/suiware",
  },
  // { title: 'Press', href: 'https://mystenlabs.com/#community' },
];

export const socialLinks = [
  {
    children: (
      <FooterIcon>
        <SocialDiscord24 />
      </FooterIcon>
    ),
    href: "https://discord.com/invite/HuDPpXz4Hx",
  },
  {
    children: (
      <FooterIcon>
        <SocialTwitter24 />
      </FooterIcon>
    ),
    href: "https://twitter.com/suiware_",
  },
  // {
  // 	children: (
  // 		<FooterIcon>
  // 			<SocialLinkedin24 />
  // 		</FooterIcon>
  // 	),
  // 	href: 'https://www.linkedin.com/company/mysten-labs/',
  // },
];

export const legalLinks = [
	{
		title: 'Terms & Conditions',
		href: 'https://mystenlabs.com/legal#termsofservice',
	},
	{
		title: 'Privacy Policy',
		href: 'https://mystenlabs.com/legal#privacypolicy',
	},
];
