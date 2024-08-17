<script lang="ts">
	import { Chart, Axis, Svg, Spline, Highlight, Tooltip, TooltipItem, Labels } from 'layerchart';
	import { scaleTime } from 'd3-scale';
	import { format, startOfDay, parseISO } from 'date-fns';
	import { formatDate, PeriodType } from 'svelte-ux/utils/date';
	import { onMount } from 'svelte';

	let userCount = [];
	let totalUserCount = 0;

	async function fetchUserCounts() {
		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const { count, totalCount } = await response.json();
			userCount = count.map((item) => ({
				...item,
				date: startOfDay(parseISO(item.date))
			}));
			totalUserCount = totalCount;
		} catch (error) {
			console.error('Error fetching user counts:', error);
		}
	}

	onMount(fetchUserCounts);
</script>

<div class="card p-4">
	<h2 class="h1 text-3xl font-extrabold mb-4">{totalUserCount} users</h2>

	<div class="h-[400px]">
		<Chart
			data={userCount}
			x="date"
			xScale={scaleTime()}
			y="value"
			yDomain={[Math.min(...userCount.map((d) => d.value)), null]}
			yNice
			padding={{ left: 16, bottom: 24, top: 16, right: 16 }}
			tooltip={{ mode: 'bisect-x' }}
		>
			<Svg>
				<Axis placement="left" grid rule />
				<Axis
					placement="bottom"
					format={(d) => formatDate(d, PeriodType.Day, { variant: 'short' })}
					rule
				/>
				<Spline class="stroke-2 stroke-primary-500" />
				<Labels format="integer" />
				<Highlight points lines />
			</Svg>
			<Tooltip header={(data) => format(data.date, 'eee, MMMM do')} let:data>
				<TooltipItem label="value" value={data.value} />
			</Tooltip>
		</Chart>
	</div>
</div>
