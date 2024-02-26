import React from 'react';
import { NewseLatter, Auctions_categories } from '../../components/component';
import Meta from '../../components/Meta';
import Hero5 from "../../components/hero/hero_5";
import Hero6 from "../../components/hero/hero_6";
import CoverflowCarousel from '../../components/carousel/coverflowCarousel';
import Process from "../../components/blog/process";
import Footer from "../../components/footer";
import Feed_carousel from "../../components/carousel/feed_carousel";
import Item_details from '../../components/categories/item_details';

const Home_4 = () => {
	return (
		<>
			<Meta title="Socialverse" />
			<Hero5 />
			<Process />
			<CoverflowCarousel />
			<Hero6 />
			<Auctions_categories />
			<Feed_carousel />
			<Item_details />
			<NewseLatter bgWhite={true} />
			<Footer />
		</>
	);
};

export default Home_4;
