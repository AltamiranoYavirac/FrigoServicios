import { Component, Inject, OnDestroy, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { LayoutService } from './service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopBarComponent } from './app.topbar.component';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnDestroy, AfterViewInit {

    // Suscripción para manejar la apertura del menú superpuesto
    overlayMenuOpenSubscription!: Subscription;

    // Listeners para clics fuera del menú
    menuOutsideClickListener: (() => void) | null = null;
    profileMenuOutsideClickListener: (() => void) | null = null;

    // Referencias a los componentes de la vista
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        @Inject(DOCUMENT) private document: Document
    ) {
        // Ocultar menús en cada cambio de ruta
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });
    }

    ngAfterViewInit(): void {
        // Nos suscribimos al observable solo después de que la vista esté lista
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            this.setupListeners();
        });
    }

    // Lógica para establecer los listeners del menú y perfil
    setupListeners(): void {
        if (!this.menuOutsideClickListener && this.appSidebar?.el) {
            this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                const isOutsideClicked = !(
                    this.appSidebar?.el?.nativeElement?.contains(event.target) ||
                    this.appTopbar?.menuButton?.nativeElement?.contains(event.target)
                );
                if (isOutsideClicked) {
                    this.hideMenu();
                }
            });
        }

        if (!this.profileMenuOutsideClickListener && this.appTopbar?.menu) {
            this.profileMenuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                const isOutsideClicked = !(
                    this.appTopbar?.menu?.nativeElement?.contains(event.target) ||
                    this.appTopbar?.topbarMenuButton?.nativeElement?.contains(event.target)
                );
                if (isOutsideClicked) {
                    this.hideProfileMenu();
                }
            });
        }

        // Bloquear scroll si el menú móvil está activo
        if (this.layoutService.state.staticMenuMobileActive) {
            this.blockBodyScroll();
        }
    }

    // Ocultar menú principal
    hideMenu(): void {
        this.layoutService.state.overlayMenuActive = false;
        this.layoutService.state.staticMenuMobileActive = false;
        this.layoutService.state.menuHoverActive = false;

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }

        this.unblockBodyScroll();
    }

    // Ocultar menú de perfil
    hideProfileMenu(): void {
        this.layoutService.state.profileSidebarVisible = false;

        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
            this.profileMenuOutsideClickListener = null;
        }
    }

    // Bloquear scroll del body
    blockBodyScroll(): void {
        this.document.body.classList.add('blocked-scroll');
    }

    // Desbloquear scroll del body
    unblockBodyScroll(): void {
        this.document.body.classList.remove('blocked-scroll');
    }

    // Clases del contenedor para aplicar estilos condicionales
    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config().colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config().colorScheme === 'dark',
            'layout-overlay': this.layoutService.config().menuMode === 'overlay',
            'layout-static': this.layoutService.config().menuMode === 'static',
            'layout-static-inactive':
                this.layoutService.state.staticMenuDesktopInactive &&
                this.layoutService.config().menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config().inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config().ripple
        };
    }

    // Verifica si la ruta actual es /admin
    isAdminRoute(): boolean {
        return this.router.url === '/admin';
    }

    // Limpieza de suscripciones y listeners al destruir el componente
    ngOnDestroy(): void {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }

        if (this.profileMenuOutsideClickListener) {
            this.profileMenuOutsideClickListener();
        }
    }
}
