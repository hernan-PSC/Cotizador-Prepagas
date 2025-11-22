    this.isLoaded = false;
    this.showComparionSidebar()

        // Al iniciar el componente, verificamos el estado actual de la pantalla
        // Nos suscribimos a los cambios del servicio para actualizar isSmallScreen cuando cambien
        this.responsiveService.screenWidth$.subscribe((state) => {
          this.cdr.detectChanges(); // Forzar actualización del DOM
          console.log(' 829     Estado actual de breakpoints:', state.breakpoints);
          this.componentSelectorMode(state.breakpoints);
        });
        this.dialogService.visible$.subscribe((value) => {
          console.log("Valor actual de visible$: ", value);
          this.visible = value; // Asigna el valor a una propiedad del componente
        });
            this.dialogService2.detailsVisible$.subscribe((value) => {
          console.log("Valor actual de detailsVisible$: ", value);
          this.detailsVisible = value; // Asigna el valor a una propiedad del componente
        });
// 2. Comprobar si hay datos en caché (ASÍNCRONO)
    let cachedProducts: any[] | null = await new Promise((resolve) => {
        caches.open("products").then((cache) => {
            cache.match("productos").then((response) => {
                if (response) {
                    response.json().then(resolve);
                } else {
                    resolve(null);
                }
            });
        });
    });
      console.log(" 907  Usando datos iniciales del formulario : ", this.formDataInicial.value);

// // 3. Obtener el valor actual del formulario
//     let formData = this.dataFormularios.getFormularioDataValue();    
//     console.log(" 912 initialFormData :", formData);
//   // 4. Lógica de inicialización: si no hay datos y no hay caché, establecemos los datos iniciales.
//     if (!formData && !cachedProducts) {
//         // Esto dispara la suscripción (Paso 5) con los datos iniciales.
//         this.dataFormularios.setFormularioData(this.formDataInicial.value);

//       // formData = this.dataFormularios.getFormularioData();
//       console.log(" 919  Usando datos iniciales del formulario : ", this.formDataInicial.value);
//     } else if (!formData && cachedProducts) {
//       // console.log("results 861 this.productosFiltrados = cachedProducts;");

//       this.productosFiltrados = cachedProducts;
//     }



    let formData = this.dataFormularios.getFormularioDataValue();
    console.log(" 928 formData :", formData);
    // Lógica para usar datos iniciales o cacheados
    console.log(" 930 cachedProducts :", cachedProducts);


    if (!formData && !cachedProducts) {
      this.dataFormularios.setFormularioData(this.formDataInicial.value);
      formData = this.dataFormularios.getFormularioDataValue();
      console.log(" 936  Usando datos iniciales del formulario : ", formData);
    } else if (!formData && cachedProducts) {
      console.log("results 938 this.productosFiltrados = cachedProducts;",cachedProducts);

     this.productoService.setProductosFiltrados(cachedProducts);
    }
      console.log("942  this.productosFiltrados = cachedProducts;",this.productosFiltrados);

// 4. Suscripción REACTIVA al formulario
this.formularioSubscription = this.dataFormularios.formularioData$.subscribe(formData => {

    console.log('🔄 Datos del formulario actualizados o cargados:', formData);
    if (formData) {
      // console.log(" 868   Datos del formulario disponibles:", formData);
      this.cotizacionService.getPrecios(formData).subscribe(
        (response: Planes) => {
          const tipo: string = formData.tipo;
          this.products = response;
          console.log('this.products 961  :',this.products)

          setTimeout(() => {
            // console.log('this.products.resultado 877:')
            // console.log(this.products )

            // console.log('this.products.resultado  880:' )
            // console.log(this.products.resultado )



            // Guardar productos filtrados en caché
            caches.open("products").then((cache) => {
              console.log("results 890 JSON.stringify(this.productosFiltrados)")

              const productosResponse = new Response(
                JSON.stringify(this.productosFiltrados)
              );
              cache
                .put("productos", productosResponse)
                .then(() => {
                  console.log(" 898 Productos almacenados en caché:", productosResponse);
                })
                .catch((cacheError) => {
                  console.error("901 Error al almacenar en caché:", cacheError);
                });
            });
console.log(' 904   this.products.resultado 785',this.products.resultado)
            // Actualizar la vista con los productos
            this.compareProdList();
            this.onItemSelect(this.selectedClinica);
          }, 0);
        },
        (error: any) => {
          console.error("Error en la solicitud de precios:", error);
        }
      );
    }
  });
  // Observadores y configuraciones adicionales (TODAS ASIGNADAS)
    this.sortbySubscription = this.SortbyParamControl.valueChanges.subscribe((selectedValue: string) => {
        // console.log(" 918 Nuevo valor seleccionado:", selectedValue);
    });

    this.empresaSubscription = this.empresa.valueChanges.subscribe((selectedValue: string) => {
        // console.log(" 922 Valor seleccionado de la empresa:", selectedValue);
    });



    this.filterClinicasSubscription = this.productoService.eventoFilterClinicas$.subscribe(() => {
        // console.log(" 931 this.productosFiltrados = filteredProducts;");
        this.productosFiltrados = this.filtrarPorClinicasExistente(
            this.productosFiltrados,
            this.selectedClinica
        );
    });

    this.productosFiltradosSubscription = this.productoService.productosFiltrados$.subscribe((productos: any[]) => {
        console.log(" 1017 this.productosFiltrados = filteredProducts;");
         console.log("prodeictos 1018 ",productos);
        this.products = productos;
        this.productosFiltrados = this.products;
    });
    
    
// this.productsSubscription = this.productService.obtenerProductos()

    // this.breakpointObserver
    //   .observe([Breakpoints.Handset, Breakpoints.Tablet])
    //   .subscribe((result) => {
    //     this.isSmallScreen = result.matches;
    //   });

    setTimeout(() => {
      this.isLoaded = true;
    }, 4000);

    console.log("this.productosFiltrados 1036",this.productosFiltrados)
    if (!this.productosFiltrados) {
      this.productosFiltrados = this.products;
    }
 console.log("this.productosFiltrados 1040",this.productosFiltrados)



    this.compareProdList();
    this.onItemSelect(this.selectedClinica);

    

    // this.breakpointObserver
    //   .observe([Breakpoints.Handset, Breakpoints.Tablet])
    //   .subscribe((result) => {
    //     this.isSmallScreen = result.matches;
    //   });
  }