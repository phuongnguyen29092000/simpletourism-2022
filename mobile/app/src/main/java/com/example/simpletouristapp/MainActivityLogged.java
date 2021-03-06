package com.example.simpletouristapp;

import android.app.SearchManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;

import com.example.simpletouristapp.databinding.ActivityMainLoggedBinding;
import com.example.simpletouristapp.model.RefreshTokenResponse;
import com.example.simpletouristapp.service.AccountApiService;
import com.example.simpletouristapp.ui.home.FilterFragment;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.Scopes;
import com.google.android.gms.common.api.Scope;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import com.squareup.picasso.Picasso;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivityLogged extends AppCompatActivity {

    public static GoogleSignInOptions gso;
    public static GoogleSignInClient gsc;
    SharedPreferences sharedPref;
    private AppBarConfiguration mAppBarConfiguration;
    private ActivityMainLoggedBinding binding;
    private SearchView searchView;
    private ImageView imageView;
    private TextView name;
    private TextView email;

    public static void getAccessInfo(Context context) {
        SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SharedPreferences preferences2 = context.getSharedPreferences("Token", MODE_PRIVATE);
        String expires = preferences2.getString("access_expires", "");
        try {
            Date access_expires = simpleDateFormat1.parse(expires);
            Date currentDate = Calendar.getInstance().getTime();
            Log.d("Date", simpleDateFormat1.format(access_expires));
            Log.d("Current Date", simpleDateFormat1.format(currentDate));
            Log.d("Check", String.valueOf(currentDate.after(access_expires)));
            if (currentDate.after(access_expires)) {
                AccountApiService accountApiService = new AccountApiService();
                Log.d("Refresh", preferences2.getString("refresh_token", ""));
                Call<RefreshTokenResponse> call = accountApiService.getAccessInfo(preferences2.getString("refresh_token", ""));
                call.enqueue(new Callback<RefreshTokenResponse>() {
                    @Override
                    public void onResponse(Call<RefreshTokenResponse> call, Response<RefreshTokenResponse> response) {
                        if (response.code() == 200) {
                            RefreshTokenResponse refreshTokenResponse = response.body();
                            SharedPreferences.Editor editor = preferences2.edit();
                            editor.putString("access_token", refreshTokenResponse.getAccessInfo().getToken());
                            editor.putString("access_expires", simpleDateFormat1.format(refreshTokenResponse.getAccessInfo().getExpires()));
                            editor.commit();
                        }
                    }

                    @Override
                    public void onFailure(Call<RefreshTokenResponse> call, Throwable t) {
                        Toast.makeText(context, t.getMessage(), Toast.LENGTH_SHORT).show();
                        Log.d("ERROR", t.getMessage());
                    }
                });
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainLoggedBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());


        gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestScopes(new Scope(Scopes.DRIVE_APPFOLDER))
                .requestServerAuthCode(getString(R.string.server_client_id))
                .requestIdToken(getString(R.string.server_client_id))
                .requestEmail()
                .build();

        gsc = GoogleSignIn.getClient(getApplicationContext(), gso);

        GoogleSignInAccount account = GoogleSignIn.getLastSignedInAccount(getApplicationContext());

        setSupportActionBar(binding.appBarMainLogged.toolbarLogged);
        DrawerLayout drawer = binding.drawerLayoutLogged;
        NavigationView navigationView = binding.navViewLogged;
        View header = navigationView.getHeaderView(0);

        imageView = (ImageView) header.findViewById(R.id.imageView);
        name = (TextView) header.findViewById(R.id.name);
        email = (TextView) header.findViewById(R.id.email);

        if (account != null) {
            String personName = account.getDisplayName();
            String personEmail = account.getEmail();
            Picasso.get().load(account.getPhotoUrl()).into(imageView);
            name.setText(personName);
            email.setText(personEmail);
            Log.w("name", account.getDisplayName());
            Log.w("email", account.getEmail());
            Log.w("photoUrl", String.valueOf(account.getPhotoUrl()));
            Log.w("GoogleId", account.getId());
            if (account.getIdToken() != null) {
                Log.w("TokenId", account.getIdToken());
            }
            Log.w("Scope", String.valueOf(account.getRequestedScopes()));
            Log.w("AuthCode", account.getServerAuthCode());
        }

        sharedPref = getSharedPreferences("Token", Context.MODE_PRIVATE);
        String accessToken = sharedPref.getString("access_token", "");
        String id = sharedPref.getString("id_customer", "");
        Log.d("AccessToken", accessToken);
        Log.d("id_customer", id);

        mAppBarConfiguration = new AppBarConfiguration.Builder(
                R.id.nav_home, R.id.nav_domestic, R.id.nav_international, R.id.nav_news, R.id.nav_account, R.id.nav_contact)
                .setOpenableLayout(drawer)
                .build();
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main_activity_logged);
        NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
        NavigationUI.setupWithNavController(navigationView, navController);


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.main, menu);
        MenuItem menuItem = menu.findItem(R.id.action_search);
        searchView = (SearchView) menuItem.getActionView();
        searchView.setQueryHint("Search here");
        SearchManager searchManager = (SearchManager) getSystemService(Context.SEARCH_SERVICE);
        searchView.setSearchableInfo(searchManager.getSearchableInfo(getComponentName()));
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String s) {
                Intent intent = new Intent(getApplicationContext(), SearchActivity.class);
                intent.putExtra("searchResult", s);
                startActivity(intent);
                return true;
            }

            @Override
            public boolean onQueryTextChange(String s) {
                return false;
            }
        });
        return super.onCreateOptionsMenu(menu);
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.action_search) {
            return true;
        }
        if (id == R.id.action_filter) {
            FilterFragment filterFragment = new FilterFragment();
            filterFragment.show(getSupportFragmentManager(), "Filter");
        }

        return super.onOptionsItemSelected(item);
    }

    @Override
    public void onBackPressed() {
        if (!searchView.isIconified()) {
            searchView.setIconified(true);
            return;
        }
        super.onBackPressed();
    }

    @Override
    public boolean onSupportNavigateUp() {
        NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment_content_main_activity_logged);
        return NavigationUI.navigateUp(navController, mAppBarConfiguration)
                || super.onSupportNavigateUp();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        MainActivityLogged.gsc.signOut().addOnCompleteListener(new OnCompleteListener<Void>() {
            @Override
            public void onComplete(@NonNull Task<Void> task) {

            }
        });
        sharedPref.edit().clear().commit();
    }
}