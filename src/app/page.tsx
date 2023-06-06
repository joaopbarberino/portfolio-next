import { Redis } from '@upstash/redis';

export const revalidate = 0;

const redis = Redis.fromEnv();

export default async function Home() {
	const member = await redis.srandmember<string>("nextjs13");

	return (
		<main>
			<h1>
				Welcome {member}
			</h1>
			<p>
				You have been randomly chosen by the redis algorithm.
			</p>
		</main>
	);
};
