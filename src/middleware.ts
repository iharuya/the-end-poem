import { NextRequest } from "next/server"
import { locales } from "./lib/locale"

const getLocale = (_: NextRequest) => {
	// const languages = new Negotiator({ headers: req.headers as any }).languages()
	// const locale = match(languages, locales, locales[0])
	return locales[0]
}

export const middleware = (req: NextRequest) => {
	const { pathname } = req.nextUrl
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
	)
	if (pathnameHasLocale) return

	const locale = getLocale(req)
	req.nextUrl.pathname = `/${locale}${pathname}`
	return Response.redirect(req.nextUrl)
}

export const config = {
	matcher: [
		// Skip all internal paths (_next)
		// '/((?!_next).*)',
		"/((?!api|static|.*\\..*|_next).*)"
	]
}
