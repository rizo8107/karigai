import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ShoppingBag, Menu, Award, Sparkles, Info, Package, Heart, Settings, LogOut, Gift, Mail, Rss } from "lucide-react"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Cart } from "./Cart"
import { Logo } from '@/components/Logo'
import { getNavbarConfig, type NavbarConfig } from "@/lib/navbar-config-service";

export default function Navbar() {
  const { user, signOut } = useAuth()
  const { itemCount } = useCart()
  const [navConfig, setNavConfig] = useState<NavbarConfig | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const config = await getNavbarConfig();
      setNavConfig(config);
    };
    fetchConfig();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center relative">
        {/* Mobile menu button (left side) */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
            <nav className="flex flex-col h-full bg-white">
              {/* Header */}
              <div className="border-b p-6">
                <SheetClose asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <Logo className="h-6" />
                  </Link>
                </SheetClose>
              </div>
              
              {/* Menu Items */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col gap-1 p-4">
                  {navConfig?.showShop && (
                    <SheetClose asChild>
                      <Link 
                        to="/shop" 
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                        Shop
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showBestsellers && (
                    <SheetClose asChild>
                      <Link 
                        to="/bestsellers" 
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Award className="h-5 w-5 text-gray-500" />
                        Bestsellers
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showNewArrivals && (
                    <SheetClose asChild>
                      <Link 
                        to="/new-arrivals" 
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Sparkles className="h-5 w-5 text-gray-500" />
                        New Arrivals
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showAbout && (
                    <SheetClose asChild>
                      <Link 
                        to="/about" 
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Info className="h-5 w-5 text-gray-500" />
                        About
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showGifting && (
                    <SheetClose asChild>
                      <Link 
                        to="/gifting"
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Gift className="h-5 w-5 text-gray-500" />
                        Gifting
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showContact && (
                    <SheetClose asChild>
                      <Link 
                        to="/contact"
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Mail className="h-5 w-5 text-gray-500" />
                        Contact
                      </Link>
                    </SheetClose>
                  )}
                  {navConfig?.showBlog && (
                    <SheetClose asChild>
                      <Link 
                        to="/blog"
                        className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors hover:bg-gray-100"
                      >
                        <Rss className="h-5 w-5 text-gray-500" />
                        Blog
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </div>
              
              {/* Footer - Auth Section */}
              <div className="border-t p-4">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name ? user.name.charAt(0) : '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" onClick={() => signOut()} aria-label="Log out">
                        <LogOut className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <SheetClose asChild>
                    <Button asChild className="w-full">
                      <Link to="/auth/login">Sign In</Link>
                    </Button>
                  </SheetClose>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Mobile centered logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:hidden">
          <Link to="/" className="flex items-center">
            <Logo className="h-6" />
          </Link>
        </div>
        
        {/* Desktop logo - left aligned */}
        <Link to="/" className="mr-6 hidden lg:flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6 justify-center mx-auto">
          {navConfig?.showShop && (
            <Link
              to="/shop"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Shop
            </Link>
          )}
          {navConfig?.showBestsellers && (
            <Link
              to="/bestsellers"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Bestsellers
            </Link>
          )}
          {navConfig?.showNewArrivals && (
            <Link
              to="/new-arrivals"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              New Arrivals
            </Link>
          )}
          {navConfig?.showAbout && (
            <Link
              to="/about"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          )}
          {navConfig?.showGifting && (
            <Link
              to="/gifting"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Gifting
            </Link>
          )}
          {navConfig?.showContact && (
            <Link
              to="/contact"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Contact
            </Link>
          )}
          {navConfig?.showBlog && (
            <Link
              to="/blog"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Blog
            </Link>
          )}
        </nav>

        {/* Cart and user menu */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Cart>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
                <span className="sr-only">Open cart</span>
              </Button>
            </Cart>

            <div className="hidden lg:block">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name ? user.name.charAt(0) : '?'}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" asChild>
                  <Link to="/auth/login">Sign in</Link>
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}