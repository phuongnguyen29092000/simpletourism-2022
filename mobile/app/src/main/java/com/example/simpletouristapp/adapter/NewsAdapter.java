package com.example.simpletouristapp.adapter;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.navigation.Navigation;
import androidx.recyclerview.widget.RecyclerView;

import com.example.simpletouristapp.R;
import com.example.simpletouristapp.model.News;
import com.example.simpletouristapp.service.ToursApiService;
import com.squareup.picasso.Picasso;

import java.util.List;

public class NewsAdapter extends RecyclerView.Adapter<NewsAdapter.NewsViewHolder>{

    private Context context;
    private List<News> newsList;

    public NewsAdapter(Context context, List<News> newsList) {
        this.context = context;
        this.newsList = newsList;
    }

    @NonNull
    @Override
    public NewsViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        View view = inflater.inflate(R.layout.item_news, parent, false);
        return new NewsViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull NewsViewHolder holder, int position) {
        News news = newsList.get(position);
        try {
            Picasso.get().load(ToursApiService.BASE_URL + news.getImageUrl().substring(7)).into(holder.imageNews);

        }catch (Exception e){
            Log.d("error",e.getMessage());
        }
        holder.title.setText(news.getTitle());
        holder.description.setText(news.getDescription());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("IdNews", news.getId());
                Navigation.findNavController(view).navigate(R.id.action_nav_news_to_nav_news_detail,bundle);
            }
        });
    }

    @Override
    public int getItemCount() {
        return newsList == null ? 0 : newsList.size();
    }

    public class NewsViewHolder extends RecyclerView.ViewHolder{
        private TextView title;
        private TextView description;
        private ImageView imageNews;
        private TextView priceAfterDiscount;
        public NewsViewHolder(@NonNull View itemView) {
            super(itemView);
            title = itemView.findViewById(R.id.tv_title);
            description = itemView.findViewById(R.id.tv_body);
            imageNews = itemView.findViewById(R.id.image_news);
        }
    }
}
