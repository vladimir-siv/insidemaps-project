export default interface IPage
{
	id: number,
	name: string,
	icon: JSX.Element,
	component: JSX.Element,
	subpages: IPage[]
}
