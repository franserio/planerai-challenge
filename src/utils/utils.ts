import { FilteredData, TransformedData } from "../types"

export const getCalenderWeekFromDate = (date: string) => {
	const timestamp = new Date(date)
	const startDate = new Date(timestamp.getFullYear(), 0, 1)
	const days = Math.floor((timestamp - startDate) / (24 * 60 * 60 * 1000))

	return Math.ceil(days / 7)
}

export const constructArrayFromRange = (
	start: number,
	stop: number,
	step: number
) =>
	Array.from(
		{ length: (stop - start) / step + 1 },
		(_, index) => start + index * step
	).map(String)

export const getQuantityByDateAndDataset = (data: FilteredData) => {
	const transformedData: TransformedData[] = data.deliveriesData.map(
		({ delivery_qty, target_date }) => {
			return {
				recommendation: 0,
				deliveries: delivery_qty,
				sales: 0,
				day: target_date,
			}
		}
	)

	data.recommendationsData.forEach(({ recommendation }, index) => {
		transformedData[index].recommendation = recommendation
	})

	data.salesData.forEach(({ sales_qty }, index) => {
		transformedData[index].sales = sales_qty
	})

	return transformedData
}

export const getWeeklyWastedRecommendedQuantities = (data: FilteredData) => {
	const quantityRecommendation = data.recommendationsData.reduce(
		(acc, value) => value.recommendation + acc,
		0
	)
	const quantitySold = data.salesData.reduce(
		(acc, value) => value.sales_qty + acc,
		0
	)

	return Math.round(quantityRecommendation - quantitySold)
}

export const getWeeklyWastedActualQuantities = (data: FilteredData) => {
	const quantityDelivered = data.deliveriesData.reduce(
		(acc, value) => value.delivery_qty + acc,
		0
	)
	const quantitySold = data.salesData.reduce(
		(acc, value) => value.sales_qty + acc,
		0
	)

	return Math.round(quantityDelivered - quantitySold)
}

export const getWeeklyRevenues = (data: FilteredData) => {
	const recommendationCosts = data.recommendationsData.reduce(
		(acc, value) => value.recommendation_value_by_price + acc,
		0
	)
	const deliveriesCosts = data.deliveriesData.reduce(
		(acc, value) => value.delivery_value_by_price + acc,
		0
	)
	const weeklySales = data.salesData.reduce(
		(acc, value) => value.sales_value + acc,
		0
	)
	return {
		actualRevenue: Math.round(weeklySales - deliveriesCosts),
		possibleRevenue: Math.round(weeklySales - recommendationCosts),
	}
}
