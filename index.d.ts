/// <reference types="react" />

// Block external access to auxiliary types
export {};

type Merge<T, U> = Omit<T, keyof U> & U;

type PropsWithAs<P, T extends React.ElementType> = P & { as?: T };

export type PolymorphicPropsWithoutRef<
	P, 
	T extends React.ElementType, 
	S extends keyof JSX.IntrinsicElements = JSX.IntrinsicElements
> = Merge<
	T extends keyof JSX.IntrinsicElements
		? T extends S
      ? React.PropsWithoutRef<JSX.IntrinsicElements[T]>
      : never
		: React.ComponentPropsWithoutRef<T>,
	PropsWithAs<P, T>
>;

export type PolymorphicPropsWithRef<
	P, 
	T extends React.ElementType, 
	S extends keyof JSX.IntrinsicElements = JSX.IntrinsicElements> = Merge<
	T extends keyof JSX.IntrinsicElements
		? T extends S
      ? React.PropsWithRef<JSX.IntrinsicElements[T]>
      : never
		: React.ComponentPropsWithRef<T>,
	PropsWithAs<P, T>
>;

// TODO:
// - PolymorphicFunctionComponent
// - PolymorphicVoidFunctionComponent (requires @types/react >=16.9.48)

type PolymorphicExoticComponent<
	P = {},
	T extends React.ElementType = React.ElementType,
> = Merge<
	React.ExoticComponent<P & { [key: string]: unknown }>,
	{
		/**
		 * **NOTE**: Exotic components are not callable.
		 */
		<InstanceT extends React.ElementType = T>(
			props: PolymorphicPropsWithRef<P, InstanceT, T>,
		): React.ReactElement | null;
	}
>;

export type PolymorphicForwardRefExoticComponent<
	P,
	T extends React.ElementType,
> = Merge<
	React.ForwardRefExoticComponent<P & { [key: string]: unknown }>,
	PolymorphicExoticComponent<P, T>
>;

export type PolymorphicMemoExoticComponent<
	P,
	T extends React.ElementType,
> = Merge<
	React.MemoExoticComponent<React.ComponentType<any>>,
	PolymorphicExoticComponent<P, T>
>;

export type PolymorphicLazyExoticComponent<
	P,
	T extends React.ElementType,
> = Merge<
	React.LazyExoticComponent<React.ComponentType<any>>,
	PolymorphicExoticComponent<P, T>
>;
