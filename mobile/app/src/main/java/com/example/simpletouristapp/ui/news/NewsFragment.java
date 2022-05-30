package com.example.simpletouristapp.ui.news;

import androidx.lifecycle.ViewModelProvider;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;


import com.example.simpletouristapp.adapter.NewsAdapter;
import com.example.simpletouristapp.databinding.NewsFragmentBinding;
import com.example.simpletouristapp.model.NewsResponse;
import com.example.simpletouristapp.service.NewsApiService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;


public class NewsFragment extends Fragment {

    private NewsFragmentBinding binding;
    private NewsApiService newsApiService;
    private NewsAdapter newsAdapter;
    private RecyclerView rvNews;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        binding = NewsFragmentBinding.inflate(inflater, container, false);
        View root = binding.getRoot();

        newsApiService = new NewsApiService();

        rvNews = binding.rvNews;

        Call<NewsResponse> call = newsApiService.getAllNews();
        call.enqueue(new Callback<NewsResponse>() {
            @Override
            public void onResponse(Call<NewsResponse> call, Response<NewsResponse> response) {
                if(response.code() == 200){
                    NewsResponse newsResponse = response.body();
                    newsAdapter = new NewsAdapter(getContext(),newsResponse.getNews());
                    rvNews.setLayoutManager(new GridLayoutManager(getContext(),2));
                    rvNews.setAdapter(newsAdapter);
                }
            }

            @Override
            public void onFailure(Call<NewsResponse> call, Throwable t) {
                Toast.makeText(getActivity(), t.getMessage(), Toast.LENGTH_SHORT).show();
                Log.d("TAG",t.getMessage());
            }
        });
        return root;
    }

    @Override
    public void onDestroyView() {
        super.onDestroyView();
        binding = null;
    }

}