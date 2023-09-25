export type RecommendationEntry = {
	target_date: string
	id_store: number
	id_product: number
	recommendation: number
	recommendation_value_by_price: number
}

export type DeliveryEntry = {
	target_date: string
	id_store: number
	id_product: number
	delivery_qty: number
	delivery_value_by_price: number
}

export type SaleEntry = {
	target_date: string
	id_store: number
	id_product: number
	sales_qty: number
	sales_value: number
	demand_qty: number
	demand_value: number
}

export type Store = {
	id_store: number
	store_label: string
	number_store: number
}

export type Product = {
	id_product: number
	name_product: string
	number_product: number
	price: number
}

export type FilteredData = {
	recommendationsData: RecommendationEntry[] | []
	deliveriesData: DeliveryEntry[] | []
	salesData: SaleEntry[] | []
}

export type TransformedData = {
	recommendation: number
	deliveries: number
	sales: number
	day: string
}
