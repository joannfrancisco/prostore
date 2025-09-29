'use client';
import {useState, useEffect} from 'react';
import { Button } from '@/components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuTrigger, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuContent,
    DropdownMenuCheckboxItem
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react';

const ModeToggle = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='focus-visible:ring-0 focus-visible:ring-offset-0'>
                {theme === 'light' ? <SunIcon /> : theme === 'dark' ? <MoonIcon /> : <SunMoon />}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
                checked={theme === 'system'}
                onClick={() => setTheme('system')}
            >
                System
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={theme === 'dark'}
                onClick={() => setTheme('dark')}
            >
                Dark
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
                checked={theme === 'light'}
                onClick={() => setTheme('light')}
            >
                Light
            </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}
 
export default ModeToggle;