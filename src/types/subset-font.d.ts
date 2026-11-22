declare module 'subset-font' {
	type Axis = number | { min: number; max: number; default?: number };

	interface Options {
		targetFormat?: 'sfnt' | 'woff' | 'woff2' | 'truetype';
		preserveNameIds?: number[];
		variationAxes?: Record<string, Axis>;
		noLayoutClosure?: boolean;
		keepAllGlyphs?: boolean;
	}

	export default function subsetFont(
		buffer: Buffer,
		text: string | null,
		options?: Options,
	): Promise<Buffer>;
}
